import React from 'react';

// Image map: hospital name -> image path (from public/images folder)
const hospitalImages = {
  "Jayadeva Hospital": "/images/jayadeva.jpeg",
  "Victoria Hospital": "/images/victoria.jpeg",
  "Kempegowda Institute of Medical Sciences": "/images/kempegowda.jpeg",
  "Rajiv Gandhi Institute of Chest Diseases": "/images/rgicd.jpeg",
  "Bowring and Lady Curzon Hospital": "/images/bowring.jpeg",
  "Vikram Hospital": "/images/vikram.jpeg",
  "Bangalore Medical College and Research Institute": "/images/bmcri.jpeg",
  "Chigateri General Hospital": "/images/chigateri.jpeg",
  "NIMHANS": "/images/nimhans.jpeg"
};

// Disease and hospital mapping
const data = {
  diseases: ["Heart Attack", "Asthma", "Diabetes", "Stroke", "Cancer"],
  hospitals: {
    "Heart Attack": [
      "Jayadeva Hospital",
      "Victoria Hospital",
      "Kempegowda Institute of Medical Sciences"
    ],
    "Asthma": [
      "Rajiv Gandhi Institute of Chest Diseases",
      "Victoria Hospital",
      "Bowring and Lady Curzon Hospital"
    ],
    "Diabetes": [
      "Vikram Hospital",
      "Bangalore Medical College and Research Institute",
      "Chigateri General Hospital"
    ],
    "Stroke": [
      "Rajiv Gandhi Institute of Chest Diseases",
      "Victoria Hospital",
      "Vikram Hospital"
    ],
    "Cancer": [
      "NIMHANS",
      "Bangalore Medical College and Research Institute",
      "Rajiv Gandhi Institute of Chest Diseases"
    ]
  }
};

export default function Hospitals() {
  // Flatten the data into an array of {name, disease} objects
  const allHospitals = [];

  for (let disease of data.diseases) {
    for (let hospital of data.hospitals[disease]) {
      allHospitals.push({ name: hospital, disease });
    }
  }

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4">Hospitals Specializing by Condition</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {allHospitals.map((hospital, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow-sm">
              <img
                src={hospitalImages[hospital.name] || "https://via.placeholder.com/300x180?text=Hospital"}
                className="card-img-top"
                alt={hospital.name}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{hospital.name}</h5>
                <p className="card-text text-muted">
                  Specializes in <strong>{hospital.disease}</strong> care.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
