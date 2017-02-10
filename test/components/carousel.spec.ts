import Carousel from "../../app/components/carousel/carousel";
import * as $ from "jquery";
import {createElement, generateAppElement} from "./../utils"

function getSettings() {
    return {
        $component: $('[carousel-component]'),
        navigation: true
    };
}

function instantiateClass(settings?:any) {
    settings = settings || getSettings();
    return new Carousel(settings);
}

function createFakeElement(slidesWidth = 300, itemWidth = 100) {
    return $(`
        <div carousel-component>
            <div carousel-slides style="width: ${slidesWidth}px">
                <div carousel-list>
                    <div carousel-item style="width: ${itemWidth}px"></div>
                </div>
            </div>
        </div>
    `);
}

describe(`{Component} Carousel`, () => {

    beforeEach(() => {
        generateAppElement();
    });

    describe(`{Method} getItemWidth`, () => {

        it(`should return the outerWidth of the element`, () => {
            const fakeElement = createFakeElement();

            createElement(fakeElement);

            const c = instantiateClass();

            expect(c.getItemWidth()).toBe(fakeElement.find('[carousel-item]').width());
        });

        it(`should return 0 if the element doesn't exist`, () => {
            const c = instantiateClass();

            expect(c.getItemWidth()).toBe(0);
        });

    });

    describe(`{Method} getDisplayingItemsAmount`, () => {

        it(`should call the method 'getItemWidth'`, () => {
            const c = instantiateClass();
            spyOn(c, 'getItemWidth');
            const fakeElement = createFakeElement();
            createElement(fakeElement);
            c.getDisplayingItemsAmount();

            expect(c.getItemWidth).toHaveBeenCalledTimes(1);
        });

        it(`should return 3 if $slides width is 300 and $item width is 100`, () => {
            const fakeElement = createFakeElement(300, 100);

            createElement(fakeElement);

            const c = instantiateClass();

            expect(c.getDisplayingItemsAmount()).toBe(3);
        });

        it(`should return 2 (instead of 1.8) if $slides width is 450 and $item width is 250`, () => {
            const fakeElement = createFakeElement(450, 250);

            createElement(fakeElement);

            const c = instantiateClass();

            expect(c.getDisplayingItemsAmount()).toBe(2);
        });
    });

});