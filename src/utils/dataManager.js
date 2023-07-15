import {supabase} from "@/managers/supabase";

export const exporter = async tableName => {
  const { data, error } = await supabase
    .from(tableName)
    .select()
    .csv()
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement("a");
  if (link.download !== undefined) { // feature detection
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${tableName}_data.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)
  }
}

