import { Descriptions } from "antd";
import packageJson from "./package.json";
const conf = {
  ...packageJson,
  title:'Crow',
  description:'crow is crawling',
  baseUrl:'/',
  pageSize: 10,
  logo: {
    main: "/logo.png",
  },
  gaId: "G-SJDYC1X4C0",
};

export default conf;
