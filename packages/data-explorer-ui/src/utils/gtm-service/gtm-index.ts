import { GTMEventCategory } from "./gtm-event-category";
import { GTMEventName } from "./gtm-event-name";
import * as GTM from "./gtm";

/**
 * Track Filter Click
 * @param {string} value
 */
export const filterClickEvent = (value: string) => {

}


/**
 * Filter search.
 * @param {string} value
 */
export const filterSearchEvent = (value: string) => {
    GTM.trackEvent(GTMEventCategory.FILTER, GTMEventName.FILTER_SEARCH, value);
}

/**
 * Get dbGap Study Request
 *
 * @param {string} study
 */
export const studyRequestEvent = (studyResource: string) => {
    GTM.trackEvent(GTMEventCategory.STUDY, GTMEventName.REQUEST_STUDY_ACCESS, studyResource);
}

/**
 * Returns true if the specified URL is a link to dbGap.
 *
 * @param {string} url
 * @returns {boolean}
 */
const isDbGaP = (url: string) => {
    return url.match(
        /^https:\/\/www\.ncbi\.nlm\.nih\.gov\/projects\/gap\/cgi-bin\/study\.cgi\?study_id=/
    );
}