export const mockData = {
    // Test credentials that we used
    testCredentials: {
      tenant: {
        phone: "8888888888",
        password: "tenant1234"
      },
      staff: {
        email: "comfortstaypatia@gmail.com",
        password_hint: "abcd1234",
        actual_password: "4321dcba"
      },
      images: {
        logo: '/images/Logo.jpeg',
        fallback: '/images/Property-1.png',
        properties: [
          '/images/Property-1.png',
          '/images/Property-2.png',
          '/images/Property-3.png'
        ]
    },
  
    // Next.js API routes we tested
    testEndpoints: {
      // Auth endpoints
      tenantLogin: "http://localhost:3000/api/auth/tenant/login",
      staffLoginLevel1: "http://localhost:3000/api/auth/staff/login/level1",
      staffLoginLevel2: "http://localhost:3000/api/auth/staff/login/level2",
      verifyToken: "http://localhost:3000/api/verify-token",
      
      // Lead registration
      registerLead: "http://localhost:3000/api/register/lead"
    },
  
    // Test responses (for reference)
    testResponses: {
      tenantLogin: {
        success: true,
        token: "test_token_123",
        message: "Login successful"
      },
      staffLoginLevel1: {
        success: true,
        message: "Level 1 authentication successful"
      },
      staffLoginLevel2: {
        success: true,
        token: "staff_test_token_123",
        message: "Staff login successful"
      },
      verifyToken: {
        success: true,
        message: "Token is valid"
      },
      registerLead: {
        success: true,
        message: "Lead registered successfully"
      }
    },
  
    // Test properties data
    properties: [
      {
        image: "/images/Property-1.png",
        address: "20°20'34.2\"N+85°49'51.1\"E",
        mapUrl: "https://www.google.com/maps/place/20%C2%B020'34.2%22N+85%C2%B049'51.1%22E/@20.3428195,85.8282863,17z",
        title: "Patia",
        price: "9000",
        coordinates: {
          lat: 20.3428195,
          lng: 85.8308612
        }
      },
      {
        image: "/images/Property-2.png",
        address: "20°20'34.2\"N+85°49'51.1\"E",
        mapUrl: "https://www.google.com/maps/place/20%C2%B020'34.2%22N+85%C2%B049'51.1%22E/@20.3428195,85.8282863,17z",
        title: "Patia",
        price: "15000",
        coordinates: {
          lat: 20.3428195,
          lng: 85.8308612
        }
      },
      {
        image: "/images/Property-3.png",
        address: "20°20'34.2\"N+85°49'51.1\"E",
        mapUrl: "https://www.google.com/maps/place/20%C2%B020'34.2%22N+85%C2%B049'51.1%22E/@20.3428195,85.8282863,17z",
        title: "Patia",
        price: "8000",
        coordinates: {
          lat: 20.3428195,
          lng: 85.8308612
        }
      }
    ],
  
    // Development flags
    flags: {
      showTestButtons: true,
      logApiCalls: true,
      mockApiResponses: true
    }
  };
  
  // Helper functions for development
  export const devHelpers = {
    logApiCall: (endpoint, data) => {
      if (mockData.flags.logApiCalls) {
        console.log(`API Call to ${endpoint}:`, data);
      }
    },
  
    getMockResponse: (endpoint) => {
      return mockData.testResponses[endpoint] || { success: false, message: "No mock response found" };
    },
  
    getTestCredentials: (type) => {
      return mockData.testCredentials[type];
    }
  };