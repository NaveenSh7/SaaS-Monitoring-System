import { IconType } from "react-icons";
import { SiExpress, SiDjango, SiFastapi, SiSpringboot } from "react-icons/si";

export interface Framework {
  id: string;
  name: string;
  Icon: IconType;
  color: string;
  docsUrl: string;
  install: string;
  code: string;
}

export const FRAMEWORKS: Framework[] = [
  {
    id: "express",
    name: "Node / Express",
    Icon: SiExpress,
    color: "#e4e4e7",
    docsUrl: "/docs/express",
    install: "npm install saas-monitering-sdk",
    code: `app.set('trust proxy', true);
const Logger = require('saas-monitering-sdk');

Logger.init({
  api_key: 'your_api_key',
});

app.use(Logger.middleware());`,
  },
  {
    id: "django",
    name: "Django",
    Icon: SiDjango,
    color: "#44b78b",
    docsUrl: "/docs/django",
    install: "# TODO: add Django package install command",
    code: "# TODO: add Django middleware snippet",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    Icon: SiFastapi,
    color: "#009688",
    docsUrl: "/docs/fastapi",
    install: "# TODO: add FastAPI package install command",
    code: "# TODO: add FastAPI middleware snippet",
  },
  {
    id: "springboot",
    name: "Spring Boot",
    Icon: SiSpringboot,
    color: "#6db33f",
    docsUrl: "/docs/springboot",
    install: "<!-- TODO: add Spring Boot dependency -->",
    code: "// TODO: add Spring Boot filter snippet",
  },
];