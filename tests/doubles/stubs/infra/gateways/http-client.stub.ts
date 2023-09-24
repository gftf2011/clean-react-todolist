/* eslint-disable max-classes-per-file */
import {
  HttpClient,
  HttpResponse,
  HttpStatusCode,
} from '@/use-cases/ports/gateways';

class HttpStatusCode200ClientStub implements HttpClient {
  constructor(private readonly output: any) {}

  async request(_data: {
    url: string;
    method: 'post' | 'get' | 'patch' | 'put' | 'delete';
    body?: any;
    headers?: any;
  }): Promise<HttpResponse<any>> {
    return {
      statusCode: HttpStatusCode.ok,
      body: this.output,
    };
  }
}

class HttpStatusCode201ClientStub implements HttpClient {
  constructor(private readonly output: any) {}

  async request(_data: {
    url: string;
    method: 'post' | 'get' | 'patch' | 'put' | 'delete';
    body?: any;
    headers?: any;
  }): Promise<HttpResponse<any>> {
    return {
      statusCode: HttpStatusCode.created,
      body: this.output,
    };
  }
}

class HttpStatusCode204ClientStub implements HttpClient {
  async request(_data: {
    url: string;
    method: 'post' | 'get' | 'patch' | 'put' | 'delete';
    body?: any;
    headers?: any;
  }): Promise<HttpResponse<any>> {
    return {
      statusCode: HttpStatusCode.noContent,
    };
  }
}

class HttpStatusCode400ClientStub implements HttpClient {
  async request(_data: {
    url: string;
    method: 'post' | 'get' | 'patch' | 'put' | 'delete';
    body?: any;
    headers?: any;
  }): Promise<HttpResponse<any>> {
    return {
      statusCode: HttpStatusCode.badRequest,
      body: {},
    };
  }
}

class HttpStatusCode401ClientStub implements HttpClient {
  async request(_data: {
    url: string;
    method: 'post' | 'get' | 'patch' | 'put' | 'delete';
    body?: any;
    headers?: any;
  }): Promise<HttpResponse<any>> {
    return {
      statusCode: HttpStatusCode.unauthorized,
      body: {},
    };
  }
}

class HttpStatusCode403ClientStub implements HttpClient {
  async request(_data: {
    url: string;
    method: 'post' | 'get' | 'patch' | 'put' | 'delete';
    body?: any;
    headers?: any;
  }): Promise<HttpResponse<any>> {
    return {
      statusCode: HttpStatusCode.forbidden,
      body: {},
    };
  }
}

class HttpStatusCode404ClientStub implements HttpClient {
  async request(_data: {
    url: string;
    method: 'post' | 'get' | 'patch' | 'put' | 'delete';
    body?: any;
    headers?: any;
  }): Promise<HttpResponse<any>> {
    return {
      statusCode: HttpStatusCode.notFound,
      body: {},
    };
  }
}

class HttpStatusCode500ClientStub implements HttpClient {
  async request(_data: {
    url: string;
    method: 'post' | 'get' | 'patch' | 'put' | 'delete';
    body?: any;
    headers?: any;
  }): Promise<HttpResponse<any>> {
    return {
      statusCode: HttpStatusCode.serverError,
      body: {},
    };
  }
}

class HttpStatusCode503ClientStub implements HttpClient {
  async request(_data: {
    url: string;
    method: 'post' | 'get' | 'patch' | 'put' | 'delete';
    body?: any;
    headers?: any;
  }): Promise<HttpResponse<any>> {
    return {
      statusCode: HttpStatusCode.serviceUnavailable,
      body: {},
    };
  }
}

class HttpStatusCode599ClientStub implements HttpClient {
  async request(_data: {
    url: string;
    method: 'post' | 'get' | 'patch' | 'put' | 'delete';
    body?: any;
    headers?: any;
  }): Promise<HttpResponse<any>> {
    return {
      statusCode: 599,
      body: {},
    };
  }
}

export class HttpClientStubFactory {
  static make(httpStatus: HttpStatusCode, output?: any): HttpClient {
    if (httpStatus === HttpStatusCode.ok) {
      return new HttpStatusCode200ClientStub(output);
    }
    if (httpStatus === HttpStatusCode.created) {
      return new HttpStatusCode201ClientStub(output);
    }
    if (httpStatus === HttpStatusCode.noContent) {
      return new HttpStatusCode204ClientStub();
    }
    if (httpStatus === HttpStatusCode.badRequest) {
      return new HttpStatusCode400ClientStub();
    }
    if (httpStatus === HttpStatusCode.unauthorized) {
      return new HttpStatusCode401ClientStub();
    }
    if (httpStatus === HttpStatusCode.forbidden) {
      return new HttpStatusCode403ClientStub();
    }
    if (httpStatus === HttpStatusCode.notFound) {
      return new HttpStatusCode404ClientStub();
    }
    if (httpStatus === HttpStatusCode.serverError) {
      return new HttpStatusCode500ClientStub();
    }
    if (httpStatus === HttpStatusCode.serviceUnavailable) {
      return new HttpStatusCode503ClientStub();
    }
    return new HttpStatusCode599ClientStub();
  }
}
