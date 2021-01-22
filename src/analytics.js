/**
 *  analytics.js;
 * Copyright 2019 Chris Sattinger
 * MIT license - do as thou wilt
 *
 * This will send page views on route change to Google Analytics.
 * Works with https://nextjs.org/ and https://github.com/fridays/next-routes
 **/

import Router from "next/router";
import ReactGA from "react-ga";

/**
 * Call this once in App (pages/_app.js) in componentDidMount
 *
 *  componentDidMount() {
 *   initGA(process.env.UA);
 * }
 *
 * Set UA environment variable to your "UA-000000-01"
 *
 * This attaches only if process.browser and UA is set.
 *
 * @param {string} UA Google Analytics UA code
 */
export const initGA = UA => {
    if (UA && process.browser) {
        ReactGA.initialize(UA, { debug: !process.env.production });
        logPageViews();
    }
};

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = "", action = "", label = "") => {
    if (category && action) {
        ReactGA.event({ category, action, label });
    }
};

export const logException = (description = "", fatal = false) => {
    if (description) {
        ReactGA.exception({ description, fatal });
    }
};

export function logPageViews() {
    logPageView();
    Router.events.on("routeChangeComplete", () => {
        logPageView();
    });
}