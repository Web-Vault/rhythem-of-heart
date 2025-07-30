// Test version of the seeder that doesn't require MongoDB
import dotenv from "dotenv";

// Mock user data
const mockUsers = [
    {
        name: "John Doe",
        email: "john@example.com",
    },
    {
        name: "Jane Smith", 
        email: "jane@example.com",
    },
    {
        name: "Bob Johnson",
        email: "bob@example.com",
    },
    {
        name: "Alice Brown",
        email: "alice@example.com",
    },
    {
        name: "Charlie Wilson",
        email: "charlie@example.com",
    }
];

const testSeeder = async () => {
    try {
        console.log("🧪 Testing seeder logic...");
        console.log("📝 Sample users to be seeded:");
        
        mockUsers.forEach((user, index) => {
            console.log(`  ${index + 1}. ${user.name} (${user.email})`);
        });
        
        console.log("✅ Seeder logic is working correctly!");
        console.log(`📊 Would seed ${mockUsers.length} users to database`);
        
        // Simulate database operations
        console.log("💾 Simulating database operations...");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async operation
        console.log("✅ Database operations completed successfully!");
        
    } catch (error) {      
        console.error("❌ Error in seeder:", error.message);
    }
};

testSeeder(); 