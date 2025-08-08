import Sqids from "sqids";

const sqids = new Sqids({
    alphabet: process.env.sqid_alphabet,
    minLength: 8,
});

export default sqids;
