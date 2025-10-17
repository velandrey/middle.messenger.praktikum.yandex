import Block from "@/utils/block";

class TestComponent extends Block {
    constructor(props: Record<string, unknown> = {}) {
        super(props);
    }

    protected render(): string {
        return '<div></div>';
    }
}

describe('Block', () => {
    let testComponent: TestComponent;

    beforeEach(() => {
        testComponent = new TestComponent();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Конструктор инициализирует свойства, дочерние блоки и списки', () => {
        // @ts-expect-error Для тестирования проверка приватных свойств
        expect(testComponent.props).toEqual({});
        // @ts-expect-error Для тестирования проверка приватных свойств
        expect(testComponent.children).toEqual({});
        // @ts-expect-error Для тестирования проверка приватных свойств
        expect(testComponent.lists).toEqual({});
    });

    it('Метод componentDidMount обрабатывает дочерние элементы и списки', () => {
        const childComponent = new TestComponent();
        const childDispatchSpy = jest.spyOn(childComponent, 'dispatchComponentDidMount');
        const componentWithChildren = new TestComponent({
            child: childComponent,
            list: [childComponent]
        });
        componentWithChildren.dispatchComponentDidMount();
        expect(childDispatchSpy).toHaveBeenCalledTimes(2);
    });

    it('Метод getContent возвращает наследованный от HTMLElement объект', () => {
        const privateComponent = testComponent as unknown as { _element: HTMLElement };
        privateComponent._element = document.createElement('div');
        const content = testComponent.getContent();
        expect(content).toBeInstanceOf(HTMLElement);
    });

    it('Метод show устанавливает стиль display: block', () => {
        const mockElement = document.createElement('div');
        const privateComponent = testComponent as unknown as { _element: HTMLElement };
        privateComponent._element = mockElement;
        testComponent.show();
        expect(mockElement.style.display).toBe('block');
    });

    it('Метод hide устанавливает стиль display: none', () => {
        const mockElement = document.createElement('div');
        const privateComponent = testComponent as unknown as { _element: HTMLElement };
        privateComponent._element = mockElement;
        testComponent.hide();
        expect(mockElement.style.display).toBe('none');
    });
});
