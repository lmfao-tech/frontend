enum Status {
    Success = 0,
    Failure = 1
}

interface Resp {
    success: Status;
    error?: any;
    data?: any;
}

export {
    Status, type Resp
}