export default class ContactEntity
{
    constructor(contactContext)
    {
        this.id = contactContext.id;
        this.name = contactContext.name;
        this.phone = contactContext.phone;
        this.email = contactContext.email;
        this.img = contactContext.img;
    }
}