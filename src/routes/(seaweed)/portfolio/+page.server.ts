import type {PageLoad} from '../../../../.svelte-kit/types/src/routes';
import * as htmlparser2 from "htmlparser2";
import {DomUtils} from "htmlparser2";

export const prerender = true;

export interface ItchMeta {
    title: string; // title
    thumbnailLink: string; // meta content name=twitter:image
    description: string; // class: user_profile formatted
}

export interface PageData {
    itchMeta?: ItchMeta;
}

// todo: save for webscraping for dynamic content during compile time
export const load: PageLoad = async (): Promise<PageData> => {
    return {};
    // return fetch("https://turnipxenon.itch.io/", {}).then(r => {
    //     return r.text().then(htmlString => {
    //         const dom = htmlparser2.parseDocument(htmlString);
    //         const imageChild = DomUtils.findOne(el => {
    //             return DomUtils.getAttributeValue(el, "name") === "twitter:image";
    //         }, dom.childNodes);
    //         const titleChild = DomUtils.findOne(el => {
    //             return el.tagName === "title";
    //         }, dom.childNodes);
    //         return {
    //             itchMeta: {
    //                 title: titleChild ? DomUtils.textContent(titleChild) : "",
    //                 thumbnailLink: imageChild !== null ? DomUtils.getAttributeValue(imageChild, "content")! : "",
    //                 description: "",
    //             }
    //         };
    //     }).catch(e => {
    //         console.error(e);
    //         return {};
    //     });
    // }).catch(e => {
    //     console.error(e);
    //     return {};
    // });
};
