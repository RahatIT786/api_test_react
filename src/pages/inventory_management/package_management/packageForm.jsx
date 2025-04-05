import React, { useState } from 'react';
import InputBox from '../../../components/ui/InputBox';
import ButtonComponent from '../../../components/ui/Button';
import MultipleSelect from '../../../components/ui/MultipleSelect';
import SingleSelect from '../../../components/ui/SingleSelect';
import TextInput from '../../../components/ui/TextInput';
import FileUpload from '../../../components/ui/FileUpload';
import DynamicCheckbox from '../../../components/ui/Checkbox';
import Summernote from '../../../components/ui/Summernote';


const PackageForm = () => {

    const [selectedFiles, setSelectedFiles] = useState(null);
    const [packageId, setPackageId] = useState('');
    const [packageName, setPackageName] = useState('');
    const [selectedPackages, setSelectedPackages] = useState([]);
    const [packageDetails, setPackageDetails] = useState({});
    const [selectServiceType, setSelectServiceType] = useState('');
    const [discription, setDiscription] = useState('');
    const [packageDays, setPackageDays] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [errors, setErrors] = useState({});

    const [summernoteContents, setSummernoteContents] = useState({
        paymentPolicy: "",
        importantNotes: "",
        cancellationPolicy: "",
        meals: "",
        visa: "",
        inclusion: "",
        exclution: "",
        itinerary: "",
    });

    const handleSummernoteChange = (field, content) => {
        setSummernoteContents((prev) => ({
          ...prev,
          [field]: content,
        }));
      };
      


    const services = [
        "Zamzam",
        "Bus",
        "Saudi SIM",
        "Welcome Kit",
        "Meals",
        "Ziyarat",
        "Visa",
        "Return Air Ticket (Economy Class)",
        "Laundry"
    ];

    const handleFileUpload = (files) => {
        setSelectedFiles(files);
        console.log("Uploaded Files:", files);
    };



    const handleCheckboxChange = (service) => {
        setSelectedServices((prevSelected) =>
            prevSelected.includes(service)
                ? prevSelected.filter((s) => s !== service) // Remove if already selected
                : [...prevSelected, service] // Add if not selected
        );
    };
    const packageOptions = ['Super Saver', 'Royal', 'Classic', 'Bronze'];
    const hotelCategories = [
        { value: '1', label: 'One Star' },
        { value: '2', label: 'Two Star' },
        { value: '3', label: 'Three Star' },
        { value: '4', label: 'Four Star' },
        { value: '5', label: 'Five Star' },
        { value: '7', label: 'Standard Hotel' },
        { value: '6', label: 'Building Accommodation' },
    ];

    const mealTypes = [
        { id: 1, foodType: 'Breakfast' },
        { id: 2, foodType: 'Half Board' },
        { id: 3, foodType: 'Full Board' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();


        if (validateForm()) {
            console.log("Form Submitted Successfully!");
            // Proceed with form submission logic (API call, etc.)
        } else {
            console.log("Form has errors.");
        }
        console.log("packageId:", packageId);
        console.log("packageName:", packageName);
        console.log("selectedPackages:", selectedPackages);
        console.log("selectServiceType:", selectServiceType);
        console.log("discription:", discription);
        console.log("Package Details:", packageDetails);
        console.log("packageDays:", packageDays);
        console.log("selectedServices:", selectedServices);
        console.log("Summernote Contents:", summernoteContents);
    };

    const handlePackageSelect = (selectedValues) => {
        // Find added and removed packages
        const addedPackages = selectedValues.filter(pkg => !selectedPackages.includes(pkg));
        const removedPackages = selectedPackages.filter(pkg => !selectedValues.includes(pkg));

        // Update selected packages
        setSelectedPackages(selectedValues);

        // Add new package details
        let updatedDetails = { ...packageDetails };
        addedPackages.forEach((pkg) => {
            updatedDetails[pkg] = {
                makka_rating: '',
                makka_hotel: '',
                makkah_nights: '',
                madina_rating: '',
                madina_hotel: '',
                madina_nights: '',
                food_type: '',
                g_share_price: '',
                qt_share_price: '',
                qd_share_price: '',
                triple_price: '',
                double_price: '',
                single_price: '',
                child_w_bed: '',
                child_wo_bed: '',
                child_infent: '',
            };
        });

        // Remove unselected package details
        removedPackages.forEach((pkg) => {
            delete updatedDetails[pkg];
        });

        setPackageDetails(updatedDetails);
    };

    const handleDetailChange = (pkg, field, value) => {
        setPackageDetails((prevDetails) => ({
            ...prevDetails,
            [pkg]: {
                ...prevDetails[pkg],
                [field]: value,
            },
        }));
    };


        // Form Validation
        const validateForm = () => {
            let formErrors = {};
            let isValid = true;

            if (!packageId.trim()) {
            formErrors.packageId = "Package ID is required.";
            isValid = false;
            }

            if (!packageName.trim()) {
            formErrors.packageName = "Package Name is required.";
            isValid = false;
            }

            if (selectedPackages.length === 0) {
            formErrors.selectedPackages = "Select at least one Package Type.";
            isValid = false;
            }

            if (!selectServiceType) {
            formErrors.selectServiceType = "Service Type is required.";
            isValid = false;
            }

            if (!discription.trim()) {
            formErrors.discription = "Description is required.";
            isValid = false;
            }

            if (!packageDays || packageDays <= 0) {
            formErrors.packageDays = "Enter a valid number of days.";
            isValid = false;
            }

            // if (!packageImage) {
            // formErrors.packageImage = "Please upload a package image.";
            // isValid = false;
            // }

            if (selectedServices.length === 0) {
                formErrors.selectedServices = "Please select at least one service.";
                isValid = false;
            }

            // Validate Summernote fields
            for (const [key, value] of Object.entries(summernoteContents)) {
                if (!value || value.trim() === "" || value === "<p><br></p>") {
                formErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
                isValid = false;
                }
            }

            selectedPackages.forEach((pkg) => {
                const details = packageDetails[pkg];
          
                // Makkah Details Validation
                if (!details.makka_hotel.trim()) {
                  formErrors[pkg + "_makka_hotel"] = "Makkah Hotel is required.";
                  isValid = false;
                }
                if (!details.makkah_nights || isNaN(details.makkah_nights) || details.makkah_nights <= 0) {
                  formErrors[pkg + "_makkah_nights"] = "Makkah Nights must be a valid positive number.";
                  isValid = false;
                }
          
                // Madina Details Validation
                if (!details.madina_hotel.trim()) {
                  formErrors[pkg + "_madina_hotel"] = "Madina Hotel is required.";
                  isValid = false;
                }
                if (!details.madina_nights || isNaN(details.madina_nights) || details.madina_nights <= 0) {
                  formErrors[pkg + "_madina_nights"] = "Madina Nights must be a valid positive number.";
                  isValid = false;
                }
          
                // Pricing Details Validation (e.g., Sharing Price, Child Prices)
                if (!details.g_share_price || isNaN(details.g_share_price) || details.g_share_price <= 0) {
                  formErrors[pkg + "_g_share_price"] = "Sharing Price must be a valid positive number.";
                  isValid = false;
                }
                if (!details.qt_share_price || isNaN(details.qt_share_price) || details.qt_share_price <= 0) {
                  formErrors[pkg + "_qt_share_price"] = "Quint Price must be a valid positive number.";
                  isValid = false;
                }
                if (!details.qd_share_price || isNaN(details.qd_share_price) || details.qd_share_price <= 0) {
                  formErrors[pkg + "_qd_share_price"] = "Quad Price must be a valid positive number.";
                  isValid = false;
                }
                if (!details.triple_price || isNaN(details.triple_price) || details.triple_price <= 0) {
                  formErrors[pkg + "_triple_price"] = "Triple Price must be a valid positive number.";
                  isValid = false;
                }
                if (!details.double_price || isNaN(details.double_price) || details.double_price <= 0) {
                  formErrors[pkg + "_double_price"] = "Double Price must be a valid positive number.";
                  isValid = false;
                }
                if (!details.single_price || isNaN(details.single_price) || details.single_price <= 0) {
                  formErrors[pkg + "_single_price"] = "Single Price must be a valid positive number.";
                  isValid = false;
                }
                if (!details.child_w_bed || isNaN(details.child_w_bed) || details.child_w_bed < 0) {
                  formErrors[pkg + "_child_w_bed"] = "Child With Bed Price must be a valid positive number.";
                  isValid = false;
                }
                if (!details.child_wo_bed || isNaN(details.child_wo_bed) || details.child_wo_bed < 0) {
                  formErrors[pkg + "_child_wo_bed"] = "Child Without Bed Price must be a valid positive number.";
                  isValid = false;
                }
                if (!details.child_infent || isNaN(details.child_infent) || details.child_infent < 0) {
                  formErrors[pkg + "_child_infent"] = "Child Infant Price must be a valid positive number.";
                  isValid = false;
                }
              });
  

            setErrors(formErrors);
            return isValid;
        };



    return (
        <div>
            <div className="page-header d-flex justify-content-between mb-4">
                <div>
                    <ul className="breadcrumbs mb-3" style={{ paddingLeft: '0px' }}>
                        <li className="nav-home">
                            <a href="#"><i className="icon-home"></i></a>
                        </li>
                        <li className="separator"><i className="icon-arrow-right"></i></li>
                        <li className="nav-item"><a href="#">Inventory </a></li>
                        <li className="separator"><i className="icon-arrow-right"></i></li>
                        <li className="nav-item"><a href="#">Package Management</a></li>
                    </ul>
                </div>
            </div>

            <div className="row justify-content-center my-5 py-5">
                <div className="col-md-10">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h3>Package Details</h3>
                        </div>
                        <div className="card-body p-5">
                            <form onSubmit={handleSubmit}>

                                <div className="row my-0">
                                    <div className="col-md-4">
                                        <InputBox
                                            label="Enter Package ID"
                                            type="text"
                                            placeholder="Enter Branch Name"
                                            value={packageId}
                                            onChange={(e) => setPackageId(e.target.value)}
                                        />
                                        {errors.packageId && <p className="text-danger">{errors.packageId}</p>}
                                    </div>
                                    <div className="col-md-4">
                                        <InputBox
                                            label="Enter Package Master Name"
                                            type="text"
                                            placeholder="Enter Branch Name"
                                            value={packageName}
                                            onChange={(e) => setPackageName(e.target.value)}
                                        />
                                        {errors.packageName && <p className="text-danger">{errors.packageName}</p>}
                                    </div>
                                    <div className="col-md-4">
                                        <MultipleSelect
                                            label="Select Package Type"
                                            options={packageOptions}
                                            selectedValues={selectedPackages}
                                            setSelectedValues={handlePackageSelect}
                                        />
                                        {errors.selectedPackages && <p className="text-danger">{errors.selectedPackages}</p>}
                                    </div>
                                </div>


                                <div className="row my-5">
                                    <div className="col-md-4">
                                        <SingleSelect
                                            label="Select Service type"
                                            options={[
                                                { value: 1, label: 'Umrah' },
                                                { value: 2, label: 'Haji' },
                                                { value: 3, label: 'Ramzan' },
                                            ]}
                                            selectedValue={selectServiceType}
                                            setSelectedValue={setSelectServiceType}
                                        />
                                         {errors.selectServiceType && <p className="text-danger">{errors.selectServiceType}</p>}
                                    </div>
                                    <div className="col-md-4">
                                        <TextInput
                                            label="Enter Discription"
                                            placeholder="Enter Discription "
                                            value={discription}
                                            onChange={(e) => setDiscription(e.target.value)}
                                        />
                                        {errors.discription && <p className="text-danger">{errors.discription}</p>}
                                    </div>
                                    <div className="col-md-4">
                                        <InputBox
                                            label="No Of Days"
                                            type="number"
                                            placeholder="Enter No Of Days"
                                            value={packageDays}
                                            onChange={(e) => setPackageDays(e.target.value)}
                                        />
                                        {errors.packageDays && <p className="text-danger">{errors.packageDays}</p>}
                                    </div>
                                </div>

                                {/* Contact Numbers */}
                                <div className="row my-3">
                                    <FileUpload
                                        label="Upload Package Image"
                                        onChange={handleFileUpload}
                                        accept="image/*"
                                        multiple={false}
                                        width="100%"
                                        height="50px"
                                    />
                                    {/* {errors.packageImage && <p className="text-danger">{errors.packageImage}</p>} */}
                                </div>

                                {/* Branch Image */}
                                <div className="row my-3">

                                    <div className="col-md-4">
                                        {services.map((service, index) => (
                                            <div key={index}>
                                                <DynamicCheckbox
                                                    label={service}
                                                    color="primary"
                                                    checked={selectedServices.includes(service)}
                                                    onChange={() => handleCheckboxChange(service)}
                                                />
                                            </div>
                                        ))}
                                        {errors.selectedServices && <p className="text-danger">{errors.selectedServices}</p>}
                                    </div>

                                    <div className="col-md-4">
                                        {services.map((service, index) => (
                                            <div key={index}>
                                                <DynamicCheckbox
                                                    label={service}
                                                    color="primary"
                                                    checked={selectedServices.includes(service)}
                                                    onChange={() => handleCheckboxChange(service)}
                                                />
                                            </div>
                                        ))}
                                        {errors.selectedServices && <p className="text-danger">{errors.selectedServices}</p>}
                                    </div>

                                    <div className="col-md-4">
                                        {services.map((service, index) => (
                                            <div key={index}>
                                                <DynamicCheckbox
                                                    label={service}
                                                    color="primary"
                                                    checked={selectedServices.includes(service)}
                                                    onChange={() => handleCheckboxChange(service)}
                                                />
                                            </div>
                                        ))}
                                        {errors.selectedServices && <p className="text-danger">{errors.selectedServices}</p>}
                                    </div>
                                </div>

                                <h3>Policies</h3>
                                <div className="row my-3">
                                    <div className="col-md-4 my-3">
                                        <h6>Payment Policy</h6>
                                        <Summernote
                                            value={summernoteContents.paymentPolicy}
                                            onChange={(content) => handleSummernoteChange("paymentPolicy", content)}
                                        />
                                    </div>

                                    <div className="col-md-4 my-3">
                                        <h6>Important Notes</h6>
                                        <Summernote
                                            value={summernoteContents.importantNotes}
                                            onChange={(content) => handleSummernoteChange("importantNotes", content)}
                                        />
                                    </div>

                                    <div className="col-md-4 my-3">
                                        <h6>Cancellation Policy</h6>
                                        <Summernote
                                            value={summernoteContents.cancellationPolicy}
                                            onChange={(content) => handleSummernoteChange("cancellationPolicy", content)}
                                        />
                                    </div>
                                </div>


                                <h3>Package Overview</h3>
                                <div className="row my-3">
                                    <div className="col-md-6 my-3">
                                        <h6>Meals</h6>
                                        <Summernote
                                            value={summernoteContents.meals}
                                            onChange={(content) => handleSummernoteChange("Meals", content)}
                                        />
                                    </div>
                                    <div className="col-md-6 my-3">
                                        <h6>Visa & Taxes</h6>
                                        <Summernote
                                            value={summernoteContents.visa}
                                            onChange={(content) => handleSummernoteChange("Visa", content)}
                                        />
                                    </div>
                                </div>

                                <h3>Inclusion , Exclusion And Itinerary</h3>
                                <div className="row my-3">
                                    <div className="col-md-4 my-3">
                                        <h6>Inclusion</h6>
                                        <Summernote
                                            value={summernoteContents.inclusion}
                                            onChange={(content) => handleSummernoteChange("Inclusion", content)}
                                        />
                                    </div>
                                    <div className="col-md-4 my-3">
                                        <h6>Exclusion</h6>
                                        <Summernote
                                            value={summernoteContents.exclution}
                                            onChange={(content) => handleSummernoteChange("Exclusion", content)}
                                        />
                                    </div>
                                    <div className="col-md-4 my-3">
                                        <h6>Itinerary</h6>
                                        <Summernote
                                            value={summernoteContents.itinerary}
                                            onChange={(content) => handleSummernoteChange("Exclusion", content)}
                                        />
                                    </div>
                                </div>

                                <div>

                                    {selectedPackages.map((pkg) => (
                                        <div key={pkg}>
                                            <hr />
                                            <h4>{pkg}</h4>

                                            {/* Makkah Details */}
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <SingleSelect
                                                        label="Makkah Hotel Category"
                                                        options={hotelCategories.map((cat) => ({
                                                            value: cat.value,
                                                            label: cat.label,
                                                        }))}
                                                        selectedValue={packageDetails[pkg].makka_rating}
                                                        setSelectedValue={(value) => handleDetailChange(pkg, "makka_rating", value)}
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Makkah Hotel"
                                                        type="text"
                                                        placeholder="Enter Makkah Hotel"
                                                        value={packageDetails[pkg].makka_hotel}
                                                        onChange={(e) => handleDetailChange(pkg, "makka_hotel", e.target.value)}
                                                    />
                                                    {errors[pkg + "_makka_hotel"] && <p className="text-danger">{errors[pkg + "_makka_hotel"]}</p>}
                                                </div>

                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Makkah Nights"
                                                        type="number"
                                                        placeholder="Enter Makkah Nights"
                                                        value={packageDetails[pkg].makkah_nights}
                                                        onChange={(e) => handleDetailChange(pkg, "makkah_nights", e.target.value)}
                                                    />
                                                    {errors[pkg + "_makkah_nights"] && <p className="text-danger">{errors[pkg + "_makkah_nights"]}</p>}
                                                </div>
                                            </div>

                                            {/* Madina Details */}
                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <SingleSelect
                                                        label="Madina Hotel Category"
                                                        options={hotelCategories.map((cat) => ({
                                                            value: cat.value,
                                                            label: cat.label,
                                                        }))}
                                                        selectedValue={packageDetails[pkg].madina_rating}
                                                        setSelectedValue={(value) => handleDetailChange(pkg, "madina_rating", value)}
                                                    />
                                                </div>

                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Madina Hotel"
                                                        type="text"
                                                        placeholder="Enter Madina Hotel"
                                                        value={packageDetails[pkg].madina_hotel}
                                                        onChange={(e) => handleDetailChange(pkg, "madina_hotel", e.target.value)}
                                                    />
                                                     {errors[pkg + "_madina_hotel"] && <p className="text-danger">{errors[pkg + "_madina_hotel"]}</p>}
                                                </div>

                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Madina Nights"
                                                        type="number"
                                                        placeholder="Enter Madina Nights"
                                                        value={packageDetails[pkg].madina_nights}
                                                        onChange={(e) => handleDetailChange(pkg, "madina_nights", e.target.value)}
                                                    />
                                                    {errors[pkg + "_madina_nights"] && <p className="text-danger">{errors[pkg + "_madina_nights"]}</p>}
                                                </div>
                                            </div>

                                            {/* Meal Type */}
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <SingleSelect
                                                        label="Meal Type"
                                                        options={mealTypes.map((meal) => ({
                                                            value: meal.id,
                                                            label: meal.foodType,
                                                        }))}
                                                        selectedValue={packageDetails[pkg].food_type}
                                                        setSelectedValue={(value) => handleDetailChange(pkg, "food_type", value)}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <SingleSelect
                                                        label="Meal Type"
                                                        options={mealTypes.map((meal) => ({
                                                            value: meal.id,
                                                            label: meal.foodType,
                                                        }))}
                                                        selectedValue={packageDetails[pkg].food_type}
                                                        setSelectedValue={(value) => handleDetailChange(pkg, "food_type", value)}
                                                    />
                                                </div>
                                            </div>

                                            {/* Pricing Details */}
                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Sharing Price"
                                                        type="number"
                                                        placeholder="Enter Sharing Price"
                                                        value={packageDetails[pkg].g_share_price}
                                                        onChange={(e) => handleDetailChange(pkg, "g_share_price", e.target.value)}
                                                    />
                                                    {errors[pkg + "_g_share_price"] && <p className="text-danger">{errors[pkg + "_g_share_price"]}</p>}
                                                </div>

                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Quint Price"
                                                        type="number"
                                                        placeholder="Enter Quint Price"
                                                        value={packageDetails[pkg].qt_share_price}
                                                        onChange={(e) => handleDetailChange(pkg, "qt_share_price", e.target.value)}
                                                    />
                                                    {errors[pkg + "_qt_share_price"] && <p className="text-danger">{errors[pkg + "_qt_share_price"]}</p>}
                                                </div>

                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Quad Price"
                                                        type="number"
                                                        placeholder="Enter Quad Price"
                                                        value={packageDetails[pkg].qd_share_price}
                                                        onChange={(e) => handleDetailChange(pkg, "qd_share_price", e.target.value)}
                                                    />
                                                    {errors[pkg + "_qd_share_price"] && <p className="text-danger">{errors[pkg + "_qd_share_price"]}</p>}
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Triple Price"
                                                        type="number"
                                                        placeholder="Enter Triple Price"
                                                        value={packageDetails[pkg].triple_price}
                                                        onChange={(e) => handleDetailChange(pkg, "triple_price", e.target.value)}
                                                    />
                                                    {errors[pkg + "_triple_price"] && <p className="text-danger">{errors[pkg + "_triple_price"]}</p>}
                                                </div>

                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Double Price"
                                                        type="number"
                                                        placeholder="Enter Double Price"
                                                        value={packageDetails[pkg].double_price}
                                                        onChange={(e) => handleDetailChange(pkg, "double_price", e.target.value)}
                                                    />
                                                    {errors[pkg + "_double_price"] && <p className="text-danger">{errors[pkg + "_double_price"]}</p>}
                                                </div>

                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Single Price"
                                                        type="number"
                                                        placeholder="Enter Single Price"
                                                        value={packageDetails[pkg].single_price}
                                                        onChange={(e) => handleDetailChange(pkg, "single_price", e.target.value)}
                                                    />
                                                    {errors[pkg + "_single_price"] && <p className="text-danger">{errors[pkg + "_single_price"]}</p>}
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Child With Bed Price"
                                                        type="number"
                                                        placeholder="Enter Child With Bed Price"
                                                        value={packageDetails[pkg].child_w_bed}
                                                        onChange={(e) => handleDetailChange(pkg, "child_w_bed", e.target.value)}
                                                    />
                                                    {errors[pkg + "_child_w_bed"] && <p className="text-danger">{errors[pkg + "_child_w_bed"]}</p>}
                                                </div>

                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Child Without Bed Price"
                                                        type="number"
                                                        placeholder="Enter Child Without Bed Price"
                                                        value={packageDetails[pkg].child_wo_bed}
                                                        onChange={(e) => handleDetailChange(pkg, "child_wo_bed", e.target.value)}
                                                    />
                                                    {errors[pkg + "_child_wo_bed"] && <p className="text-danger">{errors[pkg + "_child_wo_bed"]}</p>}
                                                </div>

                                                <div className="col-md-4">
                                                    <InputBox
                                                        label="Child Infant Price"
                                                        type="number"
                                                        placeholder="Enter Child Infant Price"
                                                        value={packageDetails[pkg].child_infent}
                                                        onChange={(e) => handleDetailChange(pkg, "child_infent", e.target.value)}
                                                    />
                                                    {errors[pkg + "_child_infent"] && <p className="text-danger">{errors[pkg + "_child_infent"]}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                                {/* Submit Button */}
                                <div className="d-flex justify-content-center my-4">
                                    <ButtonComponent color="primary" label="Submit Branch Details" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageForm
