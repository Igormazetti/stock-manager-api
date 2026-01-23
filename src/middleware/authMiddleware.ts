import { CustomError } from 'common/error/CustomError';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../database/prismaClient';
import Token from '../utils/jwt';

async function getPermissionsForCompany(companyId: string): Promise<string[]> {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      DefaultRole: {
        include: {
          permissions: {
            include: {
              Permission: true,
            },
          },
        },
      },
    },
  });

  if (!company?.DefaultRole) {
    return [];
  }

  return company.DefaultRole.permissions.map((rp) => rp.Permission.permission);
}

async function getPermissionsForEmployee(employeeId: string): Promise<string[]> {
  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
    include: {
      Role: {
        include: {
          permissions: {
            include: {
              Permission: true,
            },
          },
        },
      },
    },
  });

  if (!employee?.Role) {
    return [];
  }

  return employee.Role.permissions.map((rp) => rp.Permission.permission);
}

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new CustomError('Invalid token format', 401);
    }

    const token = authorizationHeader.split(' ')[1];
    const tokenInstance = new Token();

    // Tentar novo formato de token primeiro
    const newDecoded = tokenInstance.validateUserToken(token);
    if (newDecoded) {
      let permissions: string[] = [];

      if (newDecoded.type === 'company') {
        permissions = await getPermissionsForCompany(newDecoded.companyId);
      } else {
        permissions = await getPermissionsForEmployee(newDecoded.id);
      }

      req.user = {
        id: newDecoded.id,
        type: newDecoded.type,
        companyId: newDecoded.companyId,
        permissions,
      };

      // Manter compatibilidade com código legado
      req.company = {
        id: newDecoded.companyId,
      };

      return next();
    }

    // Fallback para formato legado (apenas company id)
    const legacyDecoded = tokenInstance.validateToken(token);
    if (legacyDecoded) {
      const permissions = await getPermissionsForCompany(legacyDecoded);

      req.company = {
        id: legacyDecoded,
      };

      req.user = {
        id: legacyDecoded,
        type: 'company',
        companyId: legacyDecoded,
        permissions,
      };

      return next();
    }

    throw new CustomError('Invalid token', 401);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError('Authentication failed', 401);
  }
};
