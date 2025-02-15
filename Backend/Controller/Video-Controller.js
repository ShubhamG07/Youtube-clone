import Video from "../Model/Video.js";

// get videos
export const getVideos = async (req, res) => {

    try {
        const result = await Video.find();
        res.status(200).json({ success: true, message: "All Video List", result })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}

// get single video
export const getSingleVideo = async (req, res) => {
    const id = req.params.id;

    try {

        const result = await Video.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Video not found" });
        }
        res.status(200).json({ success: true, message: "Video Found", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}
