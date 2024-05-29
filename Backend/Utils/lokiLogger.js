import { LOGGER } from "../server";

export const lokiLogger = (route) => {
    LOGGER.info(`Request received on route - { ${route} }`);
};
