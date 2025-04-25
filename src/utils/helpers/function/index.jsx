import { USER_BEHAVIOUR_TYPE, WITHDRAW_BEHAVIOUR_TYPE, USER_BEHAVIOUR_LIST, FRONTEND_WEB_FORMS } from "app/constants";

export function formatOrderDate(createdDate) {
    const _date = new Date(createdDate);
    return _date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
}

export function commaSeparated(_param) {
    return _param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function validateEmail(email) {
    var regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

export function userBehaviour(_case, value) {
    switch (_case) {
        case USER_BEHAVIOUR_LIST.STATUS:
            return USER_BEHAVIOUR_TYPE.STATUS[value];

        case USER_BEHAVIOUR_LIST.VERIFIED:
            return USER_BEHAVIOUR_TYPE.VERIFIED[value];

        case USER_BEHAVIOUR_LIST.AVAILABILITY:
            return USER_BEHAVIOUR_TYPE.AVAILABILITY[value];
        default:
            return false;
    }
}

export function withdrawBehaviour(status) {
    return status !== null ? WITHDRAW_BEHAVIOUR_TYPE[status] : { className: 'default', value: '' };
}

export function blogBehaviour(value) {
    switch (value) {

        case 0:
            return { className: 'error', value: 'un-published' };

        case 1:
            return { className: 'success', value: 'published' };

        default:
            return { className: '', value: '' }
    }
}

export function paymentBehaviour(value, type) {
    switch (value) {

        case 0:
            return { className: 'error', value: 'Failed' };

        case 1:
            return { className: 'success', value: 'Success' };
        case 2:
            return type === 'FINAL' ? { className: 'primary', value: 'On Hold' } : { className: 'warning', value: 'Pending' };
        case 3:
            return { className: 'primary', value: 'On Hold' };

        default:
            return { className: 'secondary', value: 'In Progress' }
    }
}
export function paymentTypeBehaviour(value) {
    switch (value) {

        case "INITIAL":
            return { className: 'warning', value: 'INITIAL' };

        case 'FINAL':
            return { className: 'info', value: 'FINAL' };
        default:
            return { className: '', value: '' }
    }
}

export function destinationBehaviour(value) {
    switch (value) {

        case 0:
            return { className: 'error', value: 'Inactive' };

        case 1:
            return { className: 'success', value: 'Active' };

        default:
            return { className: '', value: '' }
    }
}
export function userType(value) {
    switch (value) {
        case 1:
            return { className: '', value: 'Admin' };
        case 2:
            return { className: 'warning', value: 'Guide' };

        default:
            return { className: 'success', value: 'Trevler' };
    }
}


export function getEnquireFrom(FORM_TYPE) {
    return FRONTEND_WEB_FORMS[FORM_TYPE] === undefined ? FRONTEND_WEB_FORMS.NA : FRONTEND_WEB_FORMS[FORM_TYPE];
}

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve({ status: false, base64encode: reader.result });
        };
        reader.onerror = (error) => {
            reject({ status: false, base64encode: false, error: error });
        };
    });
}

export const wordsCapping = (_STRING, _LENGTH = 20) => {
    var TEXT = document.createElement("textarea");
    TEXT.innerHTML = _STRING;
    return `${TEXT.value.slice(0, _LENGTH)}${TEXT.value.length > _LENGTH ? `...` : ``}`;
}


export function seoFriendlyUrl(params, separator = "-") {
    var _param = params.replace(/[^a-zA-Z ]/g, "");
    return _param.trim().replace(/ /g, separator).toLowerCase();
}

export function hasChildren(item) {
    const { items: children } = item;

    if (children === undefined) {
        return false;
    }

    if (children.constructor !== Array) {
        return false;
    }

    if (children.length === 0) {
        return false;
    }

    return true;
}

export function dateFormat(createdDate) {
    const _date = new Date(createdDate);
    return _date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function formatDateTime(createdDate) {
    const _date = new Date(createdDate);
    return _date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: 'numeric',
        minute: 'numeric',
    });
}
