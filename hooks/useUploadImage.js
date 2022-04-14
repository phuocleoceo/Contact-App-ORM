import React, { useState } from "react";

export default function useUploadImage()
{
    const [image, setImage] = useState();

    const handleUploadImg = async () =>
    {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false)
        {
            alert("Permission to access camera roll is required!");
            return;
        }
        const options = { base64: true };
        let pickerResult = await ImagePicker.launchImageLibraryAsync(options);
        if (!pickerResult.cancelled)
        {
            setImage('data:image/jpeg;base64,' + pickerResult.base64);
        }
    }

    return image;
}
