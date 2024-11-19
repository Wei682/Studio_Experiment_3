document.addEventListener('DOMContentLoaded', () => {
    const uploadedInfo = new Set(); // Tracks successfully uploaded documents
    const allOptions = ["Tenant Info", "Property Info", "Neighborhood Info"];

    const infoButtons = document.querySelectorAll('.info-button');
    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const infoType = button.textContent;
            button.classList.toggle('selected');
        });
    });

    const uploadButton = document.getElementById('upload-button');
    uploadButton.addEventListener('click', () => {
        const selectedButtons = Array.from(document.querySelectorAll('.info-button.selected'));
        const selectedInfo = selectedButtons.map(button => button.textContent);

        if (selectedInfo.length === 0) {
            alert('No information selected for upload.');
            return;
        }

        const confirmUpload = confirm(`Do you confirm to upload the selected information?\n\n${selectedInfo.join(', ')}`);
        if (confirmUpload) {
            selectedInfo.forEach(info => uploadedInfo.add(info)); // Mark as uploaded
            alert(`Successfully uploaded: ${selectedInfo.join(', ')}`);
            // Deselect the buttons after upload
            selectedButtons.forEach(button => button.classList.remove('selected'));
        } else {
            alert('Upload canceled.');
        }
    });

    const exportButton = document.getElementById('export-button');
    exportButton.addEventListener('click', () => {
        const data = allOptions.map(option => ({
            Option: option,
            Status: uploadedInfo.has(option) ? "Uploaded" : "Not Uploaded"
        }));

        const csvContent = "Option,Status\n" +
            data.map(row => `${row.Option},${row.Status}`).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'exported_data.csv';
        link.click();
    });

    const exitButton = document.getElementById('exit-button');
    exitButton.addEventListener('click', () => {
        const exitMessage = uploadedInfo.size > 0
            ? `You have uploaded the following information: ${Array.from(uploadedInfo).join(', ')}.\nAre you sure you want to exit?`
            : 'You have not uploaded any information. Are you sure you want to exit?';

        if (confirm(exitMessage)) {
            alert('Thank you for participating. You may now close the browser.');
        }
    });
});

