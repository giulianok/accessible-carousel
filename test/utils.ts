import * as $ from "jquery";

const elementQuery:string = '#app-unit-testing';

export function getApp(): JQuery {
    const $app = $(elementQuery);

    if (!$app.length)
        throw new Error(`The element ${elementQuery} doesn't exists. Try creating one with 'generateAppElement()'`);

    return $app;
}

export function generateAppElement() {
    const $app = $(elementQuery);

    if ($app.length)
        // throw new Error(`The element ${elementQuery} already exists`);
        cleanApp();
    else
        $('body').prepend(`<div id="${elementQuery.replace('#', '')}"></div>`);
}

export function createElement($element: JQuery) {
    try {
        getApp().prepend($element)
    } catch (e) {
        throw e;
    }
}

export function cleanApp() {
    try {
        getApp().empty();
    } catch (e) {
        throw e;
    }
}