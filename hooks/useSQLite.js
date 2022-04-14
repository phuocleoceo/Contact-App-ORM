import { SET_LIST_CONTACT, SET_CURRENT_CONTACT } from "../redux/slices/contactSlice";
import ContactContext from "../models/ContactContext";
import { useDispatch } from 'react-redux';

export default function useSQLite()
{
    const dispatch = useDispatch();

    const Create_Table = async () =>
    {
        await ContactContext.createTable();
        console.log("Created contact table !");
    };

    const Drop_Table = async () =>
    {
        await ContactContext.dropTable();
        console.log("Dropped contact table !");
    };

    const Clear_Table = async () =>
    {
        await ContactContext.destroyAll();
        console.log("Cleared all contact !");
    };

    const Get_Data = async () =>
    {
        const contactDB = await ContactContext.query();
        dispatch(SET_LIST_CONTACT(contactDB));
    };

    const Get_Data_By_ID = async (id) =>
    {
        const contact = await ContactContext.find(id);
        dispatch(SET_CURRENT_CONTACT({
            id: contact.id,
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            img: contact.img
        }));
    };

    const Add_Data = async (newData) =>
    {
        await ContactContext.create(newData);
    };

    const Update_Data = async (updateData) =>
    {
        await ContactContext.update(updateData);
    };

    const Delete_Data = async (id) =>
    {
        await ContactContext.destroy(id);
    };

    const Search_Data = async (name) =>
    {
        const search_data = await ContactContext.searchContact(name);
        dispatch(SET_LIST_CONTACT(search_data));
    };

    return {
        Create_Table, Drop_Table, Clear_Table, Get_Data, Get_Data_By_ID,
        Add_Data, Update_Data, Delete_Data, Search_Data
    };
}
