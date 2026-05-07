import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  // 1. Create SKPDs
  const skpdList = [
    'Dinas Pendidikan',
    'Dinas Kesehatan',
    'Dinas Komunikasi & Informatika',
    'Dinas Perhubungan',
    'Kecamatan Cikole'
  ];

  for (const name of skpdList) {
    await prisma.skpd.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }
  
  const diskominfo = await prisma.skpd.findUnique({ where: { name: 'Dinas Komunikasi & Informatika' } })

  if (!diskominfo) throw new Error("SKPD not created");

  // 2. Create Admin User
  const adminPassword = await bcrypt.hash('admin', 10);
  await prisma.user.upsert({
    where: { nip: 'admin' },
    update: {},
    create: {
      nip: 'admin',
      name: 'Super Admin',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
      skpdId: diskominfo.id,
    },
  })

  // 3. Create Sample Pegawai User
  const userPassword = await bcrypt.hash('pegawai', 10);
  await prisma.user.upsert({
    where: { nip: '1990111020201001' },
    update: {},
    create: {
      nip: '1990111020201001',
      name: 'Drefan Sukabumi',
      passwordHash: userPassword,
      role: 'PEGAWAI',
      skpdId: diskominfo.id,
      totalJp: 12
    },
  })

  // 4. Create Courses
  await prisma.course.create({
    data: {
      title: 'Dasar-Dasar Pelayanan Publik Digital',
      category: 'Pelayanan Publik',
      description: 'Materi fundamental tentang digitalisasi pelayanan di lingkungan pemerintah.',
      jpCredit: 4,
      status: 'PUBLISHED',
      videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'
    }
  })

  await prisma.course.create({
    data: {
      title: 'Cybersecurity Awareness untuk ASN',
      category: 'Teknologi Informasi',
      description: 'Panduan menjaga keamanan data pribadi dan instansi dari serangan siber.',
      jpCredit: 6,
      status: 'PUBLISHED',
      videoUrl: 'https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4'
    }
  })

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
