import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  title: { fontSize: 20, textAlign: "center", marginBottom: 10 },
  section: { marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", backgroundColor: "blue", color: "white", padding: 5 },
  content: { fontSize: 12, marginLeft: 10 },
  footer: { fontSize: 10, textAlign: "center", marginTop: 10, position: "absolute", bottom: 10, left: 0, right: 0 },
  table: { display: "table", width: "100%", borderStyle: "solid", borderWidth: 1, marginBottom: 10 },
  row: { flexDirection: "row", borderBottomWidth: 1 },
  headerCell: { backgroundColor: "#635DFF", color: "white", padding: 5, fontWeight: "bold", flex: 1, textAlign: "center" },
  cell: { padding: 5, flex: 1, textAlign: "center" },
  listItem: { flexDirection: "row", marginLeft: 10, marginBottom: 2 },
  bulletPoint: { marginRight: 5 },
  notesContent: { fontSize: 12, marginLeft: 10, marginTop: 5, marginRight: 10, lineHeight: 1.5 }, // Added style for notes
});

const LessonPlanPDF = ({ lessonPlan }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>LESSON PLAN</Text>

        {/* Summary Section */}
        <View style={styles.sectionTitle}>
          <Text>Summary</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cell}>Date:</Text>
            <Text style={styles.cell}>{new Date().toISOString().split("T")[0]}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Grade Level:</Text>
            <Text style={styles.cell}>{lessonPlan.gradeLevel}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Main Topic:</Text>
            <Text style={styles.cell}>{lessonPlan.mainConcept}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Subtopics:</Text>
            <Text style={styles.cell}>{lessonPlan.subtopics?.join(", ") || "N/A"}</Text>
          </View>
        </View>

        {/* Materials required (Printed as List) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Materials Needed:</Text>
          {lessonPlan.materialsNeeded && lessonPlan.materialsNeeded.length > 0 ? (
            lessonPlan.materialsNeeded.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.content}>None</Text>
          )}
        </View>

        {/* Learning Objectives */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Objectives:</Text>
          <Text style={styles.content}>{lessonPlan.learningObjectives?.join(", ") || "None"}</Text>
        </View>

        {/* Lesson Plan Outline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lesson Plan Outline:</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.row}>
              <Text style={styles.headerCell}>Duration</Text>
              <Text style={styles.headerCell}>Guide</Text>
              <Text style={styles.headerCell}>Remarks</Text>
            </View>
            {/* Table Rows */}
            {lessonPlan.lessonActivities?.map((activity, index) => (
              <View key={index} style={[styles.row, { backgroundColor: "skyblue" }]}>
                <Text style={styles.cell}>{activity.duration || "N/A"}</Text>
                <Text style={styles.cell}>{activity.guide || "N/A"}</Text>
                <Text style={styles.cell}>{activity.remarks || "N/A"}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Additional Notes Section - Updated */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes:</Text>
          <Text style={styles.notesContent}>
            {lessonPlan.additionalNotes ? lessonPlan.additionalNotes : "No additional notes provided."}
          </Text>
        </View>

        {/* Footer */}
        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};

export default LessonPlanPDF;