-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "city" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "file" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
