import { atom } from "recoil";
import Room from "./components/search/Search";

const listState = atom({
    key: 'listState',
    default: []
})

const listPlayedState = atom({
    key: 'listPlayedState',
    default: []
})


const roomsState = atom<Room[]>({
    key: "roomsState", // Un identificador único
    default: [],       // El estado inicial es un array vacío
});

const listPaymentMethodState = atom({
    key: 'paymentMethodsState',
    default: [{
        id: "tarjeta",
        title: "Usa tarjetas",
        className: "pay__with__card",
        selected: "",
        form: "CardView",
        width: '70%'
    }, {
        id: "bancolombia",
        title: "Transfiere con tu cuenta Bancolombia",
        className: "pay__with__bancolombia",
        selected: "",
        form: "BancolombiaView",
        width: '70%'
    }, {
        id: "corresponsal",
        title: "Paga en efectivo en un Corresponsal Bancario",
        className: "pay__with__corresponsal",
        selected: "",
        form: "CorresponsalView",
        width: '80%'
    }, {
        id: "nequi",
        title: "Usa tu cuenta Nequi",
        className: "pay__with__nequi",
        selected: "",
        form: "NequiView",
        width: '80%'
    }, {
        id: "pse",
        title: "Usa tu cuenta de ahorros o corriente",
        className: "pay__with__pse",
        selected: "",
        form: "PseView",
        width: '70%'
    }]
})


const merchantState = atom({
    key: 'merchantState',
    default: {}
})

const paymentTypeState = atom({
    key: 'paymentTypeState',
    default: false
})

const dataPaymentState = atom({
    key: 'dataPaymentState',
    default: {}
})
const dataPaymentMethodState = atom({
    key: 'dataPaymentMethodState',
    default: {}
})

export {
    listState,
    listPlayedState,
    roomsState,
    listPaymentMethodState,
    merchantState,
    paymentTypeState,
    dataPaymentState,
    dataPaymentMethodState
};