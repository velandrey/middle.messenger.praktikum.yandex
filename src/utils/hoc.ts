import Block, {TypeProps} from "@/utils/block";
import store, {StoreEvents} from "@/utils/store";
import isEqual from "@/utils/is-equal";
import {State} from "@/utils/types";
import {cloneDeep} from "@/utils/clone-deep";

type BlockConstructor = {
    new(props: TypeProps): Block;
    prototype: Block;
};

export function hoc(mapStateToProps: (state: State) => TypeProps) {
    return function <T extends BlockConstructor>(Component: T): T {
        // @ts-expect-error mixin
        class ConnectedComponent extends Component {
            constructor(props: TypeProps) {
                // сохраняем начальное состояние
                let state: TypeProps = mapStateToProps(store.getState());
                super({...props, ...state});
                store.on(StoreEvents.Updated, () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());
                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({...newState});
                    }
                    // не забываем сохранить новое состояние
                    state = cloneDeep(newState);
                });
            }
        }

        return ConnectedComponent as T;
    };
}
