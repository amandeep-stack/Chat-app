import React, { useEffect, useState } from 'react'

export const Contact = ({ contacts, currentUser, changeChat }) => {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)

    useEffect(() => {
        if (currentUser) {
            setCurrentUserName(currentUser.username);

        }
    }, [currentUser])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact)
    }


    return (
        <>
            {
                currentUserName && (
                    <>
                        <div className='col-span-1 h-[95vh] border-r-[1px] border-[rgb(49,61,68)] bg-[rgb(17,27,33)]'>
                            <div className='text-white flex flex-col h-[100%] items-center relative'>
                                <div className='flex flex-col w-[100%]'>
                                    <div className="px-2 py-[10px] bg-[rgb(34,46,53)]">
                                        <img className='h-10 w-10' alt='avatar'
                                        />
                                        {/*<div className="username">
                                                <h3>{currentUserName}</h3>
                                             </div>*/}
                                    </div>
                                    <div className='px-2 py-2 border-b-2 border-[rgb(34,46,53)]'>
                                        <input type="text" placeholder='Search' className='w-[100%] px-2 py-[5px]  border-none outline-none rounded-lg bg-[rgb(34,46,53)]' />
                                    </div>
                                    <div className='h-[80.3vh] w-[100%] flex flex-col   overflow-auto scrollbar'>
                                        {contacts.map((contact, index) => {
                                            return (
                                                <div key={index} onClick={() => changeCurrentChat(index, contact)} className={`pl-2 flex cursor-pointer transition-all ease-in-out duration-150 items-center hover:bg-[rgb(34,46,53)] ${index === currentSelected ? 'bg-[rgb(34,46,53)]' : ''}`} >
                                                    <div className='image h-[100%] w-[20%]'>
                                                        <img className='h-[50px] my-3 w-[50px]' alt='avatar'
                                                        />
                                                    </div>
                                                    <div className="username flex items-center w-[100%] h-[100%] pl-2 border-b-2 border-[rgb(34,46,53)]">
                                                        <h3>{contact.username}</h3>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div >
                            </div >
                        </div>
                    </>
                )
            }
        </>
    )
}
