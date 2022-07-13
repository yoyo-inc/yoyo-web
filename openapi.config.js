const { generateService } = require('@umijs/openapi');

generateService({
  requestLibPath: "import { request } from '@umijs/max'",
  schemaPath: 'http://0.0.0.0:8080/swagger/doc.json',
  serversPath: './src/services',
}).then(() => {});
