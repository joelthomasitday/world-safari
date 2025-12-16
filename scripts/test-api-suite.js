const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000/api';
const ADMIN_EMAIL = 'admin@worldsafaritours';
const ADMIN_PASSWORD = '#@!WorldSafari2025';

async function runTests() {
  console.log('🚀 Starting API Test Suite...\n');

  let authToken = '';
  let uploadedImageUrl = '';
  let createdPackageId = '';

  // 1. Test Login
  console.log('1️⃣  Testing Admin Login...');
  try {
    const res = await fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });

    if (!res.ok) {
        throw new Error(`Login failed with status ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    authToken = data.token;
    if (!authToken) throw new Error('No token received');
    console.log('✅ Login Successful');
  } catch (error) {
    console.error('❌ Login Failed:', error.message);
    console.log('⚠️  Cannot proceed with protected route tests without login.');
    return;
  }

  // 2. Test Image Upload
  console.log('\n2️⃣  Testing Image Upload (Cloudinary)...');
  const dummyFilePath = path.join(__dirname, 'test-suite-image.png');
  // 1x1 pixel PNG
  const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
  fs.writeFileSync(dummyFilePath, Buffer.from(base64Png, 'base64'));

  try {
    const formData = new FormData();
    const fileBlob = new Blob([fs.readFileSync(dummyFilePath)], { type: 'image/png' });
    formData.append('file', fileBlob, 'test-suite-image.png');

    const res = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
        throw new Error(`Upload failed: ${await res.text()}`);
    }

    const data = await res.json();
    uploadedImageUrl = data.secure_url;
    console.log('✅ Upload Successful:', uploadedImageUrl);
  } catch (error) {
    console.error('❌ Upload Failed:', error.message);
    uploadedImageUrl = 'https://placehold.co/600x400'; // Fallback
  } finally {
    if (fs.existsSync(dummyFilePath)) fs.unlinkSync(dummyFilePath);
  }

  // 3. Test Create Package
  console.log('\n3️⃣  Testing Create Package...');
  try {
    const newPackage = {
      title: 'Test Safari Package ' + Date.now(),
      overview: 'A test package created by the API test suite.',
      price: '$999',
      duration: '5 Days',
      images: [uploadedImageUrl],
      inclusions: ['WiFi', 'Breakfast'],
      itinerary: [
        'Day 1: Arrival - Arrive at airport',
        'Day 2: Safari - Go to the park'
      ],
      bestTime: 'May-June',
      visa: 'Required'
    };

    const res = await fetch(`${BASE_URL}/packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(newPackage),
    });

    if (!res.ok) {
        throw new Error(`Create Package failed: ${await res.text()}`);
    }

    const data = await res.json();
    createdPackageId = data._id; // Assuming response contains the created object with _id
    console.log('✅ Package Created:', data.name, `(ID: ${createdPackageId})`);
  } catch (error) {
     console.error('❌ Create Package Failed:', error.message);
  }

  // 4. Test Get Packages
  console.log('\n4️⃣  Testing Get Packages...');
  try {
    const res = await fetch(`${BASE_URL}/packages`);
    if (!res.ok) throw new Error(`Get Packages failed: ${res.status}`);
    const packages = await res.json();
    console.log(`✅ Get Packages Successful. Retrieved ${packages.length} packages.`);
    
    // Verify our package is there
    if (createdPackageId) {
        const found = packages.find(p => p._id === createdPackageId);
        if (found) console.log('   verified: Created package was found in list.');
        else console.warn('   warning: Created package id not found in list.');
    }
  } catch (error) {
    console.error('❌ Get Packages Failed:', error.message);
  }

  // 5. Test Submit Inquiry
  console.log('\n5️⃣  Testing Submit Inquiry...');
  try {
    const inquiry = {
      name: 'Test Tester',
      email: 'test@example.com',
      phone: '1234567890',
      message: 'This is a test inquiry from the suite.'
    };

    const res = await fetch(`${BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });

    if (!res.ok) throw new Error(`Submit Inquiry failed: ${await res.text()}`);
    console.log('✅ Inquiry Submitted Successfully');
  } catch (error) {
    console.error('❌ Submit Inquiry Failed:', error.message);
  }

  // 6. Test Delete Package
  if (createdPackageId) {
    console.log('\n6️⃣  Testing Delete Package (Cleanup)...');
    try {
        const res = await fetch(`${BASE_URL}/packages?id=${createdPackageId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        // Note: Check how DELETE is implemented. Often it's api/packages/[id] or api/packages?id=...
        // Let's assume query param based on typical simple implementations, but if it fails we'll know.
        // Actually, route.ts usually handles dynamic routes or query params.
        
        if (res.ok) {
            console.log('✅ Package Deleted');
        } else {
             // Try alternate path style if query param failed
             const res2 = await fetch(`${BASE_URL}/packages/${createdPackageId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            if (res2.ok) console.log('✅ Package Deleted (via URL path)');
            else console.log(`⚠️  Delete Package Failed. Please delete ID ${createdPackageId} manually.`);
        }
    } catch (error) {
        console.error('❌ Delete Package Failed:', error.message);
    }
  }

  console.log('\n🏁 API Test Suite Completed.');
}

// Wait a second for server
setTimeout(runTests, 1000);
