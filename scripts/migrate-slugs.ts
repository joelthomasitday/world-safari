/**
 * Migration Script: Generate slugs for existing packages
 * 
 * This script will:
 * 1. Connect to MongoDB
 * 2. Find all packages without slugs
 * 3. Generate unique slugs from titles
 * 4. Update packages with new slugs
 * 
 * Run with: npx ts-node --compiler-options '{"module":"commonjs"}' scripts/migrate-slugs.ts
 * Or: npx tsx scripts/migrate-slugs.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Slug generation utility (duplicated here to avoid path alias issues in script)
function generateSlug(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '');
}

function makeSlugUnique(baseSlug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;
  
  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }
  
  return uniqueSlug;
}

// Simple Package schema for migration (without pre-save hook to avoid circular issues)
const PackageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  duration: String,
  price: String,
  overview: String,
  itinerary: [String],
  inclusions: [String],
  exclusions: [String],
  visa: String,
  bestTime: String,
  images: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

async function migratePackageSlugs() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    console.log('   Make sure you have a .env.local file with MONGODB_URI defined');
    process.exit(1);
  }

  console.log('🔗 Connecting to MongoDB...');
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);
    
    // Get all packages
    const allPackages = await Package.find({}).lean();
    console.log(`📦 Found ${allPackages.length} total packages`);
    
    // Get packages without slugs
    const packagesWithoutSlugs = allPackages.filter((pkg: any) => !pkg.slug);
    console.log(`📝 ${packagesWithoutSlugs.length} packages need slugs`);
    
    if (packagesWithoutSlugs.length === 0) {
      console.log('✅ All packages already have slugs. Nothing to migrate.');
      await mongoose.disconnect();
      return;
    }
    
    // Collect all existing slugs
    const existingSlugs: string[] = allPackages
      .map((pkg: any) => pkg.slug)
      .filter(Boolean);
    
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const pkg of packagesWithoutSlugs as any[]) {
      try {
        const baseSlug = generateSlug(pkg.title || 'untitled-package');
        const uniqueSlug = makeSlugUnique(baseSlug, existingSlugs);
        
        // Update the package with the new slug
        await Package.updateOne(
          { _id: pkg._id },
          { $set: { slug: uniqueSlug } }
        );
        
        // Add to existing slugs to prevent duplicates
        existingSlugs.push(uniqueSlug);
        
        console.log(`  ✓ "${pkg.title}" → ${uniqueSlug}`);
        updatedCount++;
      } catch (error) {
        console.error(`  ✗ Failed to update "${pkg.title}":`, error);
        errorCount++;
      }
    }
    
    console.log('\n📊 Migration Summary:');
    console.log(`   ✅ Updated: ${updatedCount} packages`);
    if (errorCount > 0) {
      console.log(`   ❌ Errors: ${errorCount} packages`);
    }
    console.log('\n✅ Migration complete!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the migration
migratePackageSlugs();
