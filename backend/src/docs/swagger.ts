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
      RegisterRequest: {
        fullname: "dika123123",
        username: "dika123123",
        email: "dika123123@gmail.com",
        password: "password123",
        confirmPassword: "password123",
      },
      ActivationRequest: {
        code: "qwerty1234567890",
      },
      EventRequest: {
        name: "Event - name",
        banner: "fileUrl",
        category: "Event - cat",
        description: "Event - desc",
        startDate: "yyyy-mm-dd hh:mm:ss",
        endDate: "yyyy-mm-dd hh:mm:ss",
        location: {
          region: "region id",
          coordinate: [0, 0],
        },
        isOnline: false,
        isFetured: false,
      },
      CategoryRequest: {
        name: "Cat - name",
        description: "Cat - desc",
        icon: "Cat - icon",
      },
      MediaRequest: {
        fileUrl: "",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "../routes/auth.routes.ts",
  "../routes/event.routes.ts",
  "../routes/category.routes.ts",
  "../routes/media.routes.ts",
  "../routes/region.routes.ts",
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
