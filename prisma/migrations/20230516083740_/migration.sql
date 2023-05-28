-- CreateTable
CREATE TABLE "UserProof" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cid" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "UserProof_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProof_address_key" ON "UserProof"("address");

-- CreateIndex
CREATE UNIQUE INDEX "UserProof_cid_key" ON "UserProof"("cid");
