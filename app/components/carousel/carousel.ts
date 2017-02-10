
interface ISettings {
    $component:JQuery,
    navigation?:boolean
}

interface IElements {
    $slides:JQuery,
    $list:JQuery,
    $item:JQuery,
    $prev:JQuery,
    $next:JQuery
}

interface IItem {
    width:number,
    show:number
}

enum NavigationDirection {
    LEFT,
    RIGHT
}

export default class Carousel {
    private $elements:IElements;
    private item:IItem;
    private hasNavigation:boolean = false;
    private position:number = 0;

    constructor(settings:ISettings) {
        this.initSetup(settings);
    }

    private initSetup(settings:ISettings) {
        const { $component } = settings;

        this.setupParameters(settings);
        this.setupElements($component);
        this.setupItemProp();
        this.arrowsEventHandler();
    }

    private setupParameters(params:ISettings) {
        this.hasNavigation = params.navigation || false;
    }

    private setupElements($component:JQuery) {
        const $slides = $component.find('[carousel-slides]');
        const $list = $slides.find('[carousel-list]');
        const $item = $list.find('[carousel-item]');
        const $prev = $component.find('[carousel-prev]');
        const $next = $component.find('[carousel-next]');

        this.$elements = {
            $slides: $slides,
            $list: $list,
            $item: $item,
            $prev: $prev,
            $next: $next,
        }
    }

    private setupItemProp() {
        this.item = {
            width: this.getItemWidth(),
            show: this.getDisplayingItemsAmount()
        };
    }

    getItemWidth():number {
        return this.$elements.$item.outerWidth() || 0;
    }

    getDisplayingItemsAmount():number {
        const {$slides} = this.$elements;
        const slidesWidth = $slides.width() || 0;
        const itemWidth = this.getItemWidth();

        return (!slidesWidth || !itemWidth) ? 0 : Math.round(slidesWidth / itemWidth);
    }

    private arrowsEventHandler() {
        const {$prev, $next} = this.$elements;

        this.jQueryEventAndNavigate($prev, this.navigateLeft.bind(this));
        this.jQueryEventAndNavigate($next, this.navigateRight.bind(this));
    }

    private jQueryEventAndNavigate($arrow:JQuery, fn:Function) {
        $arrow.on('click', (e) => {
            e.preventDefault();
            fn();
        });
    }

    private navigateLeft() { this.navigate(NavigationDirection.LEFT) }

    private navigateRight() { this.navigate(NavigationDirection.RIGHT) }

    private navigate(direction:NavigationDirection) {
        const {$list} = this.$elements;
        let {position} = this;

        switch (direction) {
            case NavigationDirection.LEFT: {
                position += this.getItemWidth();
                break;
            }
            case NavigationDirection.RIGHT: {
                position -= this.getItemWidth();
                break;
            }
        }

        $list.stop().animate({
            marginLeft: `${position}px`
        }, 500, () => {
            console.log('done')
        });

        this.position = position;
    }

}