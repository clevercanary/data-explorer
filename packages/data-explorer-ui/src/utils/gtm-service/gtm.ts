/*
 * Google Tag Manager Events tracking.
 */

declare global {
    interface Window {
        dataLayer: any;
    }
}

/**
 * Sent events to GTM
 * 
 * @param {string} eventCategory
 * @param {string} eventName
 * @param {string} eventValue
 */
export const trackEvent = (eventCategory: string, eventName: string, eventValue: string) => {
    const event = {
        eventCategory: eventCategory,
        event: eventName,
        eventValue: eventValue,
    }
    getDataLayer().push(event);
}

/**
 * Return Data Layer 
 * 
 * @returns {{}}
 */
export const getDataLayer = () => {
    return window.dataLayer;
}