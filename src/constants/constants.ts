export const AUTH_VALIDATION = {
    minNameLength: 2,
    maxNameLength: 100,
    minPasswordLength: 8,
    maxPasswordLength: 100,
    addressMinLength: 2,
    addressMaxLength: 100,
};

export const ITEM_REQUEST_VALIDATION = {
    minItemNameLength: 2,
    maxItemNameLength: 100,
    minItemDescriptionLength: 2,
    maxItemDescriptionLength: 200,
    minClosureTime: new Date(
        new Date().setMinutes(new Date().getMinutes() + (48 + 5.5)*60)
    )
        .toISOString()
        .slice(0, new Date().toISOString().lastIndexOf(":")),
    maxClosureTime: new Date(
        new Date().setMinutes(new Date().getMinutes() + (730 + 5.5)*60)
    )
        .toISOString()
        .slice(0, new Date().toISOString().lastIndexOf(":")),
    notOlderThanMinValue: 1,
    notOlderThanMaxValue: 120,
    minNumberOfItems: 1,
    maxNumberOfItems: 100000,
    maxPriceMinValue: 1,
    maxPriceMaxValue: 99999999,
};

// 128 kb
export const FILE_SIZE_LIMIT = 128 * 1024;

// 1 mb
export const IMAGE_SIZE_LIMIT = 1 * 1024 * 1024;

export const EMAIL_REGEX = /.+\@.+\..+/;

export const PASSWORD_REGEX = /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/;

export const ONLY_ALPHABET_REGEX = /^[a-zA-Z ]*$/;
