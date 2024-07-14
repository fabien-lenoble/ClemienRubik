<template>
  <div class="flex gap-2">
    <div
      class="basis-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded transition duration-150 ease-in-out transform"
    >
      <button @click="exportAllData">
        <i class="fa-solid fa-download" />
        export all data
      </button>
    </div>
    <div
      class="basis-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded transition duration-150 ease-in-out transform"
    >
      <button @click="importAllData()">
        <i class="fa-solid fa-upload" />
        import all data
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSession } from "@/composables/session";
import { useSettings } from "@/composables/settings";
import { useTraining } from "@/composables/training";
const { setSessionSolves } = useSession();
const { cornerMemoResults } = useTraining();

const { settings } = useSettings();

function exportAllData() {
  const settings = JSON.parse(localStorage.getItem("settings") || "{}");
  const sessionSolves = JSON.parse(
    localStorage.getItem("sessionSolves") || "{}"
  );
  const cornerMemoResults = JSON.parse(
    localStorage.getItem("cornerMemoResults") || "{}"
  );
  const data = {
    settings,
    sessionSolves,
    cornerMemoResults,
  };

  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

  // Generate the current date string
  // Format: YYYY-MM-DD hh:mm:ss
  const date = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "")
    .replace(/:/g, "-");

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  // Set the download attribute with the desired file name
  a.download = `RumixCubeData-${date}.json`;

  // Append to the document, trigger the download, and remove
  document.body.appendChild(a); // Append to ensure it works in Firefox
  a.click();
  document.body.removeChild(a); // Clean up
}

function importAllData() {
  // Create a file input element
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json"; // Accept only JSON files

  // Listen for file selection
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) {
      return; // No file selected
    }

    // Read the file
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      try {
        // Parse the JSON content
        const data = JSON.parse(text as string);

        if (data.settings) {
          settings.value = data.settings;
          localStorage.setItem("settings", JSON.stringify(data.settings));
        }
        if (data.sessionSolves) {
          setSessionSolves(data.sessionSolves);
        }
        if (data.cornerMemoResults) {
          cornerMemoResults.value = data.cornerMemoResults;
          localStorage.setItem(
            "cornerMemoResults",
            JSON.stringify(data.cornerMemoResults)
          );
        }

        // Here, you can also update your application's state or perform other actions with the imported data
      } catch (error) {
        console.error("Error parsing the file", error);
      }
    };
    reader.readAsText(file);
  };

  // Trigger the file input dialog
  input.click();
}
</script>
