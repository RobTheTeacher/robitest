export const slugify =(text:string) => {
    return text
           .toLowerCase()
           .trim()
           .replace(/[^\w\s-]/g, '')
           .replace(/[\s-]/g, '-')
           .replace(/-+/g, '-')
}