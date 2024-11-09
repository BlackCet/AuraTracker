import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const CourseDetail = () => {
    const { courseId } = useParams();
    const { user } = useAuthContext();
    const [materials, setMaterials] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);   

    
    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await fetch(`/api/course/${courseId}/materials`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                const json = await response.json();
                if (response.ok) {
                    setMaterials(json);
                } else {
                    alert(`Failed to fetch materials: ${json.error || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error fetching materials:', error);
                alert('Could not fetch materials. Try again later.');
            }finally {
                setLoading(false);
            }
        };

        if (user) fetchMaterials();
    }, [courseId, user]);

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('material', file);
        formData.append('title', title);
        formData.append('description', description);

        try {
            const response = await fetch(`/api/course/${courseId}/materials`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
                body: formData
            });

            const json = await response.json();
            if (response.ok) {
                setMaterials(json); // Update the materials list with the latest data
                setTitle('');
                setDescription('');
                setFile(null);
            } else {
                alert(`Failed to upload material: ${json.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Try again later.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Course Materials</h2>

            {loading && <div className="text-center">Loading...</div>} {/* Loading Spinner */}

            {/* Materials List */}
            <div className="mb-6">
                {materials.map((material) => (
                    <div key={material._id} className="mb-4 p-4 border rounded-lg bg-gray-100">
                        <h4 className="font-semibold">{material.title}</h4>
                        <p>{material.description}</p>
                        <a href={material.filePath} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            View Material
                        </a>
                    </div>
                ))}
            </div>

            {/* File Upload Form */}
            <form onSubmit={handleFileUpload} className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Upload New Material</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Select File (PDF only)</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full p-2 border rounded"
                        accept="application/pdf"
                        required
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
                    Upload Material
                </button>
            </form>
        </div>
    );
};

export default CourseDetail;
