import React, { useState, useEffect } from 'react';
import { addMenuItem, getMenuItemById, updateMenuItem } from '../../services/MenuItemsService';
import { useNavigate, useParams } from 'react-router-dom';

import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Select from "react-select"

const SaveMenuItem = ({ token, itemId }) => {
    const navigate = useNavigate();
    const { menuItemId } = useParams();
    const [isActive, setIsActive] = useState(true);
    const [launchDate, setLaunchDate] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // state for menu item data
    const [inintMenu, setInitMenu] = useState({
        menuItemId:0,
        name: '',
        price: null,
        isActive: false,
        launchDate: null,
        isFreeDelivery: false,
        category: ''
    });

    // Validation schema for validation of menu item 
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name is required").min(2, 'you have to enter minimum two characters.').nullable(),
        price: Yup.number().required("price is required"),
        isActive: Yup.boolean(),
        launchDate: Yup.date().required("launch date is required"),
        isFreeDelivery: Yup.boolean().required("Yes or No"),
        category: Yup.string().required("category is required."),

    });

    // create or update menu item
    const handleSubmit = async (data) => {
        setIsLoading(true);
        try {
            console.log(data);
            if(menuItemId >0){
             const result =  await updateMenuItem(menuItemId,data,token);
                navigate(-1);
            }else{
                await addMenuItem(data, token);
                navigate(-1);
            }
        } catch (error) {
            setError(`Failed to update menu item: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // cancel or back 
    const handleBack = () => {
        navigate(-1);
    }

    // categories 
    const categories = [
        { label: 'Drink', value: "DRINK" },
        { label: 'Starter', value: "STARTER" }, // please change oprtion here value must me in capital
        { label: 'Main Course', value: "MAIN_COURSE" },
        { label: 'Dessert', value: "DESSERT" },
    ]

    // fetch data in update case
    const fetchData = async() =>{
        try{
            setIsLoading(true);
            const data = await getMenuItemById(menuItemId,token);
            // console.log("menuitem",menuItem);
            if(data.menuItem){
                setInitMenu({...data.menuItem,launchDate:new Date(data.menuItem.launchDate)});
            }
            setIsLoading(false);
        }catch(e){
            setIsLoading(false);
            console.log(e);
        }
    }

    // react hook form for data handling and error handling 
    const methods = useForm({
        mode: "onChange",
        defaultValues: inintMenu,
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        // trigger errors on component mount
        methods.trigger();
        if(menuItemId > 0){
            fetchData();
        }
    }, [menuItemId]);

    useEffect(()=>{
        methods.reset(inintMenu);
    },[inintMenu])


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">{menuItemId > 0 ? 'Update' : 'Add'} Menu Item</h2>
            <FormProvider {...methods}>
                <form action='' onSubmit={(e) => {
                    e.preventDefault();
                    // console.log("errors", methods.formState.errors)
                    methods.handleSubmit(handleSubmit)();
                }} className="border p-4 rounded shadow">
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            className={`form-control ${methods.formState.errors?.name ? 'input-error' : ''}`}
                            {...methods.register('name', { required: true })}
                        />
                        <div className='text-danger'>{methods.formState?.errors?.name?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price:</label>
                        <input
                            type="number"
                            className="form-control"
                            {...methods.register('price', { required: true })}
                        />
                        <div className='text-danger'>{methods.formState?.errors?.price?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Launch Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            {...methods.register('launchDate')}
                        />
                        <div className='text-danger'>{methods.formState?.errors?.launchDate?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <Controller
                            control={methods.control}
                            {...methods.register('category')}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    openMenuOnFocus
                                    options={categories}
                                    isClearable
                                    onChange={(category)=>{
                                        methods.setValue('category',category?.value ||'',{shouldValidate:true})
                                    }}
                                    value={categories?.find(x=>x.value === methods?.getValues()?.category)}
                                />
                            )}
                        />
                        <div className='text-danger'>{methods.formState?.errors?.category?.message}</div>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            {...methods.register('isActive')}
                        />
                        <label className="form-check-label">Is Active</label>
                        <div className='text-danger'>{methods.formState?.errors?.isActive?.message}</div>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            {...methods.register('isFreeDelivery')}
                        />
                        <label className="form-check-label">Is Free Delivery</label>
                        <div className='text-danger'>{methods.formState?.errors?.isFreeDelivery?.message}</div>
                    </div>
                    <div className='d-flex'>
                        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                            {isLoading ? 'loading...' : menuItemId > 0 ? 'Update' : 'Save'}
                        </button>
                        <button type="button" onClick={handleBack} className="btn  w-100" disabled={isLoading}>
                            Cancel
                        </button>
                    </div>
                    {/* {error && <p className="text-danger mt-3">{error}</p>} */}
                </form>
            </FormProvider>
        </div>
    );
};

export default SaveMenuItem;
