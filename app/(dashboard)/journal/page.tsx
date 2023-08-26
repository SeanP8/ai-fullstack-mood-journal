import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import { analyze } from "@/util/ai";
import { getUserByClerkID } from "@/util/auth";
import { prisma } from "@/util/db";
import Link from "next/link";

const getEntries = async () => {
  const user = await getUserByClerkID();
  const data = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

const JournalPage = async () => {
  const data = await getEntries();

  return (
    <div className="p-10 bg-gray-200 h-full">
      <h2 className="text-4xl mb-8">Journal</h2>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {data.map((entry) => (
          <div key={entry.id}>
            <Link href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
