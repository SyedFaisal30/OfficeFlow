class ApiError extends Error {
    constructor (
        status,
        success,
        message="Something went Wrong",
        errors=[],
        stack="",
    ){
        super(message);
        this.status = status;
        this.data = null;
        this.message = message;
        this.success = success;
        this.errors = errors
        if ( stack ) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }

    toJSON() {
        return {
          status: this.status,
          success: this.success,
          message: this.message,
          errors: this.errors,
        };
      }
    
}

export { ApiError };