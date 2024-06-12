import { useState, useEffect } from "react"

type ProfileImageSectionProps = {
    imageSectionFn: (value: boolean) => void,
    profileImageFn : (value: string) => void
};

function ProfileImageSection({imageSectionFn, profileImageFn}: ProfileImageSectionProps) {

    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        fetch("public/data/images.json")
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            setImages(response);
        })
    }, [])

    const handleSection = (image: string) => {
        profileImageFn(image);
        imageSectionFn(false);
    }

    return (
        <div className="relative ">
            <svg xmlns="http://www.w3.org/2000/svg" 
            onClick={() => imageSectionFn(false)}
            width="22" height="22" fill="currentColor" 
            className="bi bi-x-circle cursor-pointer absolute top-[-14%] right-[-8%]" 
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
            <div className="grid grid-cols-3 gap-5">
                {
                    images.map((image, index) => (
                        <img className="h-20 rounded-[50px] border-white border-4 
                        cursor-pointer profileImage" onClick={() => handleSection(image)}
                        src={image} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

function AccountCreationPage() {

    const [name, setName] = useState<string>("");
    const [profileImage, setProfileImage] = useState<string>("../../public/images/image1.jpg");

    const [imageSection, setImageSection] = useState<boolean>(false);
    const [nameError, setNameError] = useState<boolean>(false);

    const handleAccountCreation = () => {
        if(name.length < 3) {
            setNameError(true);
            return;
        }
        //TODO
    }

    return (
        <div>
            {
                imageSection ? <ProfileImageSection imageSectionFn={setImageSection} profileImageFn={setProfileImage} /> 
                : 
                <div className="flex flex-col gap-6 items-center">
                    <div className="relative cursor-pointer" 
                    onClick={() => setImageSection(!imageSection)}>
                        <img src={profileImage} alt="" 
                        className="h-20 rounded-[50px] border-white 
                        border-4"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="20" height="20" fill="currentColor" 
                        className="bi bi-plus-circle absolute right-0 bottom-[-8%]" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                    </div>
                    <div>
                        {
                            nameError ?
                            <p className="text-xs mb-2 text-red-300">
                                Name should contain atleast 3 characters!!
                            </p> : <></>
                        }
                        <input className="p-2 pl-3 rounded" value={name} 
                        onChange={(event) => {
                            setName(event.target.value) 
                            setNameError(false)
                        }}
                        type="text" placeholder="Enter your name" />
                    </div>
                    <button onClick={handleAccountCreation}
                    className="bg-[#1A1A1A] p-3 rounded-lg">Create Account</button>
                </div>
            }
        </div>
    )
}

export default AccountCreationPage