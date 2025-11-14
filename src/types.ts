export type Game = {
    id: string
    title: string
    description?: string
    thumb: string // thumbnail URL
    url: string // play or embed URL
    embedType?: "iframe" | "webgl" | "html" | "link"
    tags?: string[]
}