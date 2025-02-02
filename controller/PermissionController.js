const Permission = require('../model/PermissionList');
 // Import the Permission model

// POST route to create a new permission
const permissionHandler=async (req, res) => {
    const { rollNo, year, section, startingDate, endDate } = req.body;

    // Validate the input
    if (!rollNo || !year || !section || !startingDate || !endDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newPermission = new Permission({
            rollNo,
            teacherId:req.teacherId,
            year,
            section,
            startingDate,
            endDate,
        });

        // Save the permission to the database
        await newPermission.save();

        // Respond with the created permission
        res.status(201).json({massge:`RollNo is added sucessfully into department permission lits`});
    } catch (error) {
        console.error('Error saving permission:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const permissionListHandler = async (req, res) => {
    const { year, section } = req.query; // Get filtering parameters
    console.log(year);
    console.log(section);
    try {
        const filter = {};
        if (year && !isNaN(year)) filter.year = Number(year); // Add year filter if provided and is a number
        if (section) filter.section = section; // Add section filter if provided
        
        console.log('Filter being used:', filter); // Log the filter
        const permissions = await Permission.find(filter); // Apply filter
        console.log('Fetched permissions:', permissions); // Log the fetched permissions
        res.status(200).json({ permissions }); // Ensure the key matches the fetched data
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports ={permissionHandler,permissionListHandler}