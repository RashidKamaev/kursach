-- AddForeignKey
ALTER TABLE "ModerationRequest" ADD CONSTRAINT "ModerationRequest_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
