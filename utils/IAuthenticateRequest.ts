import { Request } from "express";
// Define a custom interface that extends the Express Request interface
export default interface IAuthenticatedRequest extends Request {
    user?: any; // Change 'any' to the appropriate type for your user object
  }