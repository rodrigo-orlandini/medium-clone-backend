import jwt from 'jsonwebtoken';

interface AuthenticateProps {
    token: string | undefined;
}

export const authenticate = ({ token }: AuthenticateProps) => {
    // Checking token existence
    if(!token) {
        return {
            status: 401,
            data: {
                message: "Token not found."
            }
        };
    }

    // Checking token compatibility
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        return {
            status: 200,
            // @ts-ignore
            data: { ...decoded }
        };
    } catch(error) {    
        console.error(error);
        return {
            status: 500,
            data: {
                message: "Token is not compatible."
            }
        };
    }
}