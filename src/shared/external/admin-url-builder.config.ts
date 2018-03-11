import {UrlBuilder} from ".//url-builder.util";
import {environment as ENVIRONMENT} from "./environment";

const ADMIN_APP_CONTEXT = "/admin-services";

export const adminUrlBuilderProvider  = () => UrlBuilder.builder(ENVIRONMENT).forAppContext(ADMIN_APP_CONTEXT);