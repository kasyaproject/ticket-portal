import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "Documentasi API Ticket Portal",
    description:
      "Applikasi untuk pembelian/pemesanan tiket dengan menggunakan MERN Stack",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development server",
    },
    {
      url: "https://kasyaproject-ticket-portal-backend.vercel.app/api",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "username123",
        password: "password123",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/auth.routes.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
